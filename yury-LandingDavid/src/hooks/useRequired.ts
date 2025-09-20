import type { FieldErrors } from "react-hook-form";

interface useRequiredProp{
    errors: FieldErrors<any>
}

export const useRequired = ({errors}: useRequiredProp) => {
    return Object.values(errors).some(error => error?.type === "required")
}