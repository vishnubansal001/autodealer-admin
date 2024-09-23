export interface ModalType{
    heading : string,
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void,
    cta: string,
    formid: string,
    onSubmit: (event: any) => void,
    ctaClass: "danger" | "primary" | "default" | "secondary" | "success" | "warning" | undefined,
    modalClass: string,
    enableFooter: boolean,
}