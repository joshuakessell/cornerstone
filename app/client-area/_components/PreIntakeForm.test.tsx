import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PreIntakeForm } from "@/app/client-area/_components/PreIntakeForm";

afterEach(() => {
  vi.restoreAllMocks();
});

function renderForm(onSubmit = vi.fn()) {
  return { ...render(<PreIntakeForm onSubmit={onSubmit} />), onSubmit };
}

describe("CA-2 Step 1 has exactly 3 required fields", () => {
  it("renders fullName, preferredContact radios, and one conditional input", () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("required");
    const emailRadio = screen.getByRole("radio", { name: /email/i });
    const phoneRadio = screen.getByRole("radio", { name: /phone/i });
    expect(emailRadio).toHaveAttribute("required");
    expect(phoneRadio).toHaveAttribute("required");
  });

  it("exposes 3 semantic fields when a contact method is selected (fullName + radiogroup + 1 conditional)", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("radio", { name: /email/i }));
    // Semantic groups: fullName (labeled text) + preferredContact (1 radiogroup of 2) + 1 conditional input
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/phone number/i)).toBeNull();
  });
});

describe("CA-3 submit with empty fields marks fullName aria-invalid", () => {
  it("aria-invalid='true' on fullName after invalid submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm(onSubmit);
    await user.click(screen.getByRole("button", { name: /continue|submit/i }));
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("aria-invalid", "true");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe("CA-4 email branch reveals email input, required", () => {
  it("selecting 'email' shows an email-type input with required", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("radio", { name: /email/i }));
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("required");
    expect(screen.queryByLabelText(/phone number/i)).toBeNull();
  });
});

describe("CA-5 phone branch reveals tel input, required", () => {
  it("selecting 'phone' shows a tel-type input with required", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("radio", { name: /phone/i }));
    const telInput = screen.getByLabelText(/phone number/i);
    expect(telInput).toHaveAttribute("type", "tel");
    expect(telInput).toHaveAttribute("required");
    expect(screen.queryByLabelText(/email address/i)).toBeNull();
  });
});

describe("CA-6 no network call on submit", () => {
  it("global.fetch is NOT called after a valid submit", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.click(screen.getByRole("radio", { name: /email/i }));
    await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /continue|submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: "Jane Doe",
        preferredContact: "email",
        emailAddress: "jane@example.com",
      })
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("PreIntakeForm (radiogroup labelling for a11y)", () => {
  it("radios share a fieldset/legend describing 'Preferred contact method'", () => {
    const { container } = renderForm();
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).not.toBeNull();
    const legend = fieldset?.querySelector("legend");
    expect(legend?.textContent ?? "").toMatch(/preferred|contact/i);
    const radios = within(fieldset as HTMLElement).getAllByRole("radio");
    expect(radios).toHaveLength(2);
  });
});
