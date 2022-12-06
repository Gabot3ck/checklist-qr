export const showModal = (id, index, filename) => {

    const d = document;
    const btn = d.getElementById(id);
    


    btn.addEventListener("click", () => {
        const $elementPrint = d.getElementById(index);

        html2pdf()
            .set({
                margin: 1,
                filename: filename,
                image: {
                    type: "jpeg",
                    quality: 0.98,
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "portrait"
                }
            })
            .from($elementPrint)
            .save()
            .catch(error => console.log(error));
    });
}

