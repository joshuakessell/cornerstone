"use client";

import { useState, type FormEvent } from "react";
import { preIntakeSchema, type PreIntakeData } from "./preIntakeSchema";

type ContactMethod = "email" | "phone" | "";
type InvalidMap = Record<string, boolean>;

interface PreIntakeFormProps {
  onSubmit: (data: PreIntakeData) => void;
}

export function PreIntakeForm({ onSubmit }: PreIntakeFormProps) {
  const [method, setMethod] = useState<ContactMethod>("");
  const [invalid, setInvalid] = useState<InvalidMap>({});
  return (
    <form
      onSubmit={handleSubmitFor(setInvalid, onSubmit)}
      noValidate
      className="flex flex-col gap-6"
      data-testid="pre-intake-form"
    >
      <PreIntakeFields method={method} invalid={invalid} onMethodChange={setMethod} />
    </form>
  );
}

function handleSubmitFor(
  setInvalid: (m: InvalidMap) => void,
  onValid: (d: PreIntakeData) => void
) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const result = preIntakeSchema.safeParse(raw);
    if (!result.success) {
      setInvalid({ ...invalidFields(result.error.issues), ...invalidFromRaw(raw) });
      return;
    }
    setInvalid({});
    onValid(result.data);
  };
}

interface FieldsProps {
  method: ContactMethod;
  invalid: InvalidMap;
  onMethodChange: (m: ContactMethod) => void;
}

function PreIntakeFields({ method, invalid, onMethodChange }: FieldsProps) {
  return (
    <>
      <FullNameField invalid={!!invalid.fullName} />
      <ContactMethodField onChange={onMethodChange} />
      {method === "email" && <EmailField invalid={!!invalid.emailAddress} />}
      {method === "phone" && <PhoneField invalid={!!invalid.phoneNumber} />}
      <SubmitButton />
    </>
  );
}

function SubmitButton() {
  return (
    <button
      type="submit"
      className="self-start rounded-md bg-brand-navy-700 px-5 py-2 font-semibold text-white hover:bg-brand-navy-900"
    >
      Continue
    </button>
  );
}

function invalidFields(
  issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey> }>
): InvalidMap {
  const out: InvalidMap = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string") out[key] = true;
  }
  return out;
}

function invalidFromRaw(raw: Record<string, FormDataEntryValue>): InvalidMap {
  const out: InvalidMap = {};
  if (!raw.fullName || String(raw.fullName).trim() === "") out.fullName = true;
  if (!raw.preferredContact) out.preferredContact = true;
  return out;
}

function FullNameField({ invalid }: { invalid: boolean }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-brand-navy-900">Full name</span>
      <input
        name="fullName"
        type="text"
        required
        aria-invalid={invalid || undefined}
        className="rounded-md border border-brand-navy-100 px-3 py-2"
      />
    </label>
  );
}

function ContactMethodField({ onChange }: { onChange: (m: ContactMethod) => void }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-semibold text-brand-navy-900">
        Preferred contact method
      </legend>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="preferredContact"
          value="email"
          required
          onChange={() => onChange("email")}
        />
        <span>Email</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="preferredContact"
          value="phone"
          required
          onChange={() => onChange("phone")}
        />
        <span>Phone</span>
      </label>
    </fieldset>
  );
}

function EmailField({ invalid }: { invalid: boolean }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-brand-navy-900">Email address</span>
      <input
        name="emailAddress"
        type="email"
        required
        aria-invalid={invalid || undefined}
        className="rounded-md border border-brand-navy-100 px-3 py-2"
      />
    </label>
  );
}

function PhoneField({ invalid }: { invalid: boolean }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-brand-navy-900">Phone number</span>
      <input
        name="phoneNumber"
        type="tel"
        required
        aria-invalid={invalid || undefined}
        className="rounded-md border border-brand-navy-100 px-3 py-2"
      />
    </label>
  );
}
