document.addEventListener('DOMContentLoaded', function() {
    // Funzione per mostrare la sezione selezionata
    function showSection(id) {
        const sections = document.querySelectorAll('.sheet');
        sections.forEach(section => {
            if (section.id === id) {
                section.style.display = 'block';
                section.style.opacity = 0;
                setTimeout(() => {
                    section.style.opacity = 1;
                    section.style.transition = 'opacity 0.5s ease';
                }, 100);
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Mostra la prima sezione di default (Overview)
    showSection('overview');

    // Event listener per il cambiamento di sezione
    document.querySelectorAll('.nav-bar a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Funzione per caricare e visualizzare i dati dal file Excel
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const htmlString = XLSX.utils.sheet_to_html(worksheet);
            document.getElementById('tableContainer').innerHTML = htmlString;
        };

        reader.readAsArrayBuffer(file);
    });

    // Effetto di cambio colore del logo al scroll
    document.addEventListener('scroll', function() {
        const logo = document.querySelector('.header-logo');
        if (window.scrollY > 50) {
            logo.style.color = '#0072bc'; // Colore del logo al scroll
        } else {
            logo.style.color = '#000'; // Colore originale del logo
        }
    });
});
