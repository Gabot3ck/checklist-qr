export const validateInput = (input) => {
    input.classList.add("foco");
            setTimeout(()=>{
                input.classList.remove("foco");
            }, 2500);
}