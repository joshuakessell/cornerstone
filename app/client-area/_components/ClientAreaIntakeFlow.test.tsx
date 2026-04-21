import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClientAreaIntakeFlow } from "@/app/client-area/_components/ClientAreaIntakeFlow";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("CA-7 valid submit reveals Step 2 (clio-embed or clio-placeholder)", () => {
  it("shows clio-placeholder when env var missing, after valid submit", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "");
    const user = userEvent.setup();
    render(<ClientAreaIntakeFlow />);

    expect(screen.queryByTestId("clio-placeholder")).toBeNull();
    expect(screen.queryByTestId("clio-embed")).toBeNull();

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.click(screen.getByRole("radio", { name: /email/i }));
    await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /continue|submit/i }));

    expect(screen.getByTestId("clio-placeholder")).toBeInTheDocument();
  });

  it("shows clio-embed when env var is set, after valid submit", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "https://example.com/clio");
    const user = userEvent.setup();
    render(<ClientAreaIntakeFlow />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.click(screen.getByRole("radio", { name: /phone/i }));
    await user.type(screen.getByLabelText(/phone number/i), "5551234567");
    await user.click(screen.getByRole("button", { name: /continue|submit/i }));

    expect(screen.getByTestId("clio-embed")).toBeInTheDocument();
  });
});

describe("CA-10 before submit, total form controls on flow === 3", () => {
  it("renders only the pre-intake form controls initially", () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "");
    const { container } = render(<ClientAreaIntakeFlow />);
    const textInputs = container.querySelectorAll("input:not([type='radio']):not([type='hidden'])");
    const radios = container.querySelectorAll("input[type='radio']");
    // fullName (1 text) + email-or-phone conditional (0 until radio selected) + 2 radios
    expect(textInputs.length + radios.length).toBeLessThanOrEqual(4);
  });
});
