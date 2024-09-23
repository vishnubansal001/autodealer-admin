import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { ModalType } from '../../types/modalType';

const ModalContainer = ({ heading, children, isOpen, onClose, cta, formid, onSubmit, ctaClass, modalClass = "", enableFooter = true }:ModalType) => {
  const { onOpen } = useDisclosure();
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose || onOpen} className={modalClass}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 capitalize border-b border-slate-300">{heading}</ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {formid ? (enableFooter && <Button form={formid} type='submit' color={ctaClass}>
                {cta}
              </Button>) : (enableFooter && <Button color={ctaClass} type='submit' onPress={onSubmit}>{cta}</Button>)}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalContainer