"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

/**
 * ConfirmModal - Uses reusable Modal + Button
 *
 * USAGE:
 * <ConfirmModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   onConfirm={handleDelete}
 *   title="Delete this item?"
 *   message="This action cannot be undone"
 *   variant="danger"
 * />
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  icon: CustomIcon,
}) {
  const variantStyles = {
    danger: {
      icon: "text-red-500 bg-red-100 dark:bg-red-500/20",
      buttonVariant: "danger",
    },
    warning: {
      icon: "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20",
      buttonVariant: "primary",
    },
    info: {
      icon: "text-blue-500 bg-blue-100 dark:bg-blue-500/20",
      buttonVariant: "secondary",
    },
  };

  const styles = variantStyles[variant];
  const Icon = CustomIcon || AlertTriangle;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={styles.buttonVariant}
            size="md"
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4 py-2">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl",
            "flex items-center justify-center",
            styles.icon,
          )}
        >
          <Icon size={24} />
        </div>

        {/* Text */}
        <div className="flex-1 pt-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}
