import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type = "contact", name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "Resend API key is not configured." }, { status: 500 });
    }

    let subject = "";
    let htmlContent = "";

    if (type === "quote") {
      const { selections, carePlan, paymentMethod, subtotal, discount, vat, grandTotal, notes } = body;

      subject = `New Project Quote Request: ${name}`;

      // Build a clean summary of selections
      let specsHtml = "";
      if (selections) {
        specsHtml = Object.entries(selections)
          .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
          .join("");
      }

      htmlContent = `
        <h3>New Build Configuration Specs Submitted</h3>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Payment Method Preference:</strong> ${paymentMethod === "full" ? "Pay in Full (10% discount)" : "Milestone Payments"}</p>
        <p><strong>Aiventra Care Plan:</strong> ${carePlan || "none"}</p>
        
        <h4>Selected Configurator Specs:</h4>
        <ul>
          ${specsHtml || "<li>None selected</li>"}
        </ul>

        <h4>Estimation Cost Sheets:</h4>
        <ul>
          <li><strong>Subtotal:</strong> $${subtotal?.toLocaleString() || "0"}</li>
          <li><strong>Discount Applied:</strong> -$${discount?.toLocaleString() || "0"}</li>
          <li><strong>VAT (7.5%):</strong> $${vat?.toLocaleString() || "0"}</li>
          <li><strong>Estimated Upfront Cost (Grand Total):</strong> $${grandTotal?.toLocaleString() || "0"}</li>
        </ul>

        <h4>Additional Notes:</h4>
        <p>${(notes || "None").replace(/\n/g, "<br/>")}</p>
      `;
    } else {
      const { company, details } = body;
      subject = `New Lead: ${name} from ${company || "Individual"}`;
      htmlContent = `
        <h3>New Lead from Aiventra Studio Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Project Details:</strong></p>
        <p>${(details || "").replace(/\n/g, "<br/>")}</p>
      `;
    }

    // Call Resend API using native fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Aiventra Studio Leads <hello@aiventrastudio.com>",
        to: ["aiventrastudios@gmail.com"],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to send email." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
