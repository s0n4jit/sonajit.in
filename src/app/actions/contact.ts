'use server';

/**
 * Server Action to handle contact form submissions.
 * This keeps the Formspree endpoint secure on the server.
 */
export async function submitContactForm(formData: { name: string; email: string; message: string }) {
  // Only use server-side environment variables for security.
  const endpoint = process.env.FORMSPREE_ENDPOINT;

  if (!endpoint) {
    console.error("FORMSPREE_ENDPOINT is not defined in server environment variables.");
    return { success: false, error: "Contact form is not configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://sonajit.in",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => null);
      console.error("Formspree error:", errorData);
      return { success: false, error: "Formspree rejected the submission" };
    }
  } catch (error) {
    console.error("Server Action contact submission error:", error);
    return { success: false, error: "Unable to reach Formspree" };
  }
}
