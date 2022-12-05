
export const showMessage = (message, type) => {
    Toastify({
        text: message,
        duration: 2500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === "exito" ? "#65C400" : "#d8211b",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}