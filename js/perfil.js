// script.js

document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('editBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const form = document.getElementById('personalInfoForm');
    
    // Campos requeridos
    const requiredFields = [
        'nombre',
        'apellido',
        'email',
        'telefono',
        'direccion',
        'ciudad',
        'estado',
        'codigoPostal'
    ];

    // Datos originales (para cancelar)
    let originalData = {};

    // Cargar datos originales
    function loadOriginalData() {
        requiredFields.forEach(field => {
            const viewElement = document.getElementById(`view-${field}`);
            const editElement = document.getElementById(`edit-${field}`);
            if (viewElement && editElement) {
                originalData[field] = viewElement.textContent;
            }
        });
    }

    // Cambiar a modo edición
    function enableEditMode() {
        viewMode.classList.add('hidden');
        editMode.classList.remove('hidden');
        editBtn.style.display = 'none';
        
        // Enfocar el primer campo
        const firstInput = document.querySelector('#edit-nombre');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    // Cambiar a modo vista
    function enableViewMode() {
        viewMode.classList.remove('hidden');
        editMode.classList.add('hidden');
        editBtn.style.display = 'flex';
        
        // Recargar datos originales
        restoreOriginalData();
        clearAllErrors();
    }

    // Restaurar datos originales
    function restoreOriginalData() {
        requiredFields.forEach(field => {
            const editElement = document.getElementById(`edit-${field}`);
            if (editElement && originalData[field] !== undefined) {
                editElement.value = originalData[field];
            }
        });
    }

    // Actualizar vista con nuevos datos
    function updateViewData() {
        requiredFields.forEach(field => {
            const viewElement = document.getElementById(`view-${field}`);
            const editElement = document.getElementById(`edit-${field}`);
            if (viewElement && editElement) {
                viewElement.textContent = editElement.value;
                originalData[field] = editElement.value;
            }
        });
    }

    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar teléfono
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Validar campo vacío
    function isEmpty(value) {
        return !value || value.trim() === '';
    }

    // Mostrar error en campo
    function showFieldError(fieldId, message) {
        const field = document.getElementById(`edit-${fieldId}`);
        const errorDiv = document.getElementById(`error-${fieldId}`);
        
        field.classList.add('error');
        if (errorDiv) {
            errorDiv.textContent = message;
        }
    }

    // Limpiar error de campo
    function clearFieldError(fieldId) {
        const field = document.getElementById(`edit-${fieldId}`);
        const errorDiv = document.getElementById(`error-${fieldId}`);
        
        field.classList.remove('error');
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    }

    // Limpiar todos los errores
    function clearAllErrors() {
        requiredFields.forEach(field => {
            clearFieldError(field);
        });
    }

    // Mostrar toast
    function showToast(message, type = 'error') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toast.classList.remove('hidden', 'error', 'success');
        toast.classList.add(type);
        toastMessage.textContent = message;
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 5000);
    }

    // Validar formulario
    function validateForm() {
        let isValid = true;
        const errors = [];

        clearAllErrors();

        requiredFields.forEach(field => {
            const input = document.getElementById(`edit-${field}`);
            const value = input.value;

            if (isEmpty(value)) {
                showFieldError(field, 'Este campo no puede estar vacío');
                isValid = false;
                errors.push(`${field} vacío`);
            } else {
                switch(field) {
                    case 'email':
                        if (!isValidEmail(value)) {
                            showFieldError(field, 'Email inválido');
                            isValid = false;
                            errors.push('Email inválido');
                        }
                        break;
                    case 'telefono':
                        if (!isValidPhone(value)) {
                            showFieldError(field, 'Teléfono inválido');
                            isValid = false;
                            errors.push('Teléfono inválido');
                        }
                        break;
                    case 'codigoPostal':
                        if (value.length < 5) {
                            showFieldError(field, 'Mínimo 5 caracteres');
                            isValid = false;
                            errors.push('CP inválido');
                        }
                        break;
                }
            }
        });

        return { isValid, errors };
    }

    // Inicializar
    loadOriginalData();

    // Event Listeners
    editBtn.addEventListener('click', enableEditMode);

    cancelBtn.addEventListener('click', function() {
        if (confirm('¿Cancelar edición? Los cambios no guardados se perderán.')) {
            enableViewMode();
            showToast('Edición cancelada', 'error');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const { isValid } = validateForm();

        if (isValid) {
            updateViewData();
            enableViewMode();
            showToast('Cambios guardados exitosamente', 'success');
        } else {
            showToast('Corrige los errores en el formulario', 'error');
            
            const firstError = document.querySelector('.form-input.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Validación en tiempo real
    requiredFields.forEach(field => {
        const input = document.getElementById(`edit-${field}`);
        
        if (input) {
            input.addEventListener('blur', function() {
                const value = this.value;
                
                if (isEmpty(value)) {
                    showFieldError(field, 'Campo requerido');
                } else {
                    switch(field) {
                        case 'email':
                            if (!isValidEmail(value)) {
                                showFieldError(field, 'Email inválido');
                            } else {
                                clearFieldError(field);
                            }
                            break;
                        case 'telefono':
                            if (!isValidPhone(value)) {
                                showFieldError(field, 'Teléfono inválido');
                            } else {
                                clearFieldError(field);
                            }
                            break;
                        case 'codigoPostal':
                            if (value.length < 5) {
                                showFieldError(field, 'Mínimo 5 caracteres');
                            } else {
                                clearFieldError(field);
                            }
                            break;
                        default:
                            clearFieldError(field);
                    }
                }
            });

            input.addEventListener('input', function() {
                if (!isEmpty(this.value)) {
                    clearFieldError(field);
                }
            });
        }
    });

    // Prevenir envío con Enter en campos de formulario
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    });
});

// Función global para cancelar (por si se necesita)
function cancelEdit() {
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.click();
    }
}