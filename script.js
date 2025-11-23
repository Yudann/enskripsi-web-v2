// =============================
// FUNGSI PERMUTASI
// =============================
function permutasi(text) {
    const processedText = text.toLowerCase().replace(/\s/g, '_');
    const chars = processedText.split("");
    const pola = [1, 0, 2, 4, 3];
    let result = "";

    for (let i = 0; i < chars.length; i += 5) {
        const block = chars.slice(i, i + 5);

        if (block.length === 5) {
            let newBlock = [];
            for (let j = 0; j < 5; j++) {
                newBlock[j] = block[pola[j]];
            }
            result += newBlock.join("");
        } else {
            result += block.join("");
        }
    }

    return result;
}

function reversePermutasi(text) {
    const chars = text.split("");
    const pola = [1, 0, 2, 4, 3];
    let result = "";

    for (let i = 0; i < chars.length; i += 5) {
        const block = chars.slice(i, i + 5);

        if (block.length === 5) {
            let newBlock = [];
            newBlock[pola[0]] = block[0];
            newBlock[pola[1]] = block[1];
            newBlock[pola[2]] = block[2];
            newBlock[pola[3]] = block[3];
            newBlock[pola[4]] = block[4];
            result += newBlock.join("");
        } else {
            result += block.join("");
        }
    }

    return result.replace(/_/g, ' ');
}

// =============================
// FUNGSI SUBSTITUSI
// =============================
function substitusi(text) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + 10) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + 10) % 26) + 65);
            }
        }
        return char;
    }).join('');
}

function reverseSubstitusi(text) {
    return text.split('').map(char => {
        if (char.match(/[A-Z]/)) {
            const code = char.charCodeAt(0);
            return String.fromCharCode(((code - 65 - 10 + 26) % 26) + 97);
        } else if (char.match(/[a-z]/)) {
            const code = char.charCodeAt(0);
            return String.fromCharCode(((code - 97 - 10 + 26) % 26) + 97);
        }
        return char;
    }).join('');
}

// =============================
// ALUR ENKRIPSI / DEKRIPSI
// =============================
function encryptPipeline(text) {
    let step1 = substitusi(text);
    let step2 = permutasi(step1);
    return { step1, step2 };
}

function decryptPipeline(cipher) {
    let step1 = reversePermutasi(cipher);
    let step2 = reverseSubstitusi(step1);
    return { step1, step2 };
}

// =============================
// ANIMASI UNTUK HASIL
// =============================
function animateResult(element, text) {
    element.classList.remove('filled');
    element.innerText = '';
    
    // Tambahkan efek typing
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
            element.classList.add('filled');
        }
    }, 50);
}

// =============================
// EVENT LISTENER TOMBOL ENKRIPSI
// =============================
document.getElementById("btnEnkripsi").addEventListener("click", () => {
    const input = document.getElementById("inputText").value.trim();

    if (!input) {
        alert("Teks tidak boleh kosong!");
        return;
    }

    const hasil = encryptPipeline(input);

    // Animasi untuk hasil enkripsi
    animateResult(document.getElementById("outputSubstitusi"), hasil.step1);
    
    // Delay sedikit untuk animasi kedua
    setTimeout(() => {
        animateResult(document.getElementById("outputPermutasi"), hasil.step2);
    }, 200);

    // Kosongkan output dekripsi dengan animasi
    const reverseElements = [
        document.getElementById("outputReversePermutasi"),
        document.getElementById("outputReverseSubstitusi")
    ];
    
    reverseElements.forEach(el => {
        el.classList.remove('filled');
        el.innerText = '';
    });
});

// =============================
// EVENT LISTENER TOMBOL DEKRIPSI
// =============================
document.getElementById("btnDekripsi").addEventListener("click", () => {
    const input = document.getElementById("inputText").value.trim();

    if (!input) {
        alert("Teks tidak boleh kosong!");
        return;
    }

    const hasil = decryptPipeline(input);

    // Animasi untuk hasil dekripsi
    animateResult(document.getElementById("outputReversePermutasi"), hasil.step1);
    
    // Delay sedikit untuk animasi kedua
    setTimeout(() => {
        animateResult(document.getElementById("outputReverseSubstitusi"), hasil.step2);
    }, 200);

    // Kosongkan output enkripsi dengan animasi
    const encryptElements = [
        document.getElementById("outputSubstitusi"),
        document.getElementById("outputPermutasi")
    ];
    
    encryptElements.forEach(el => {
        el.classList.remove('filled');
        el.innerText = '';
    });
});

// =============================
// FUNGSI COPY TO CLIPBOARD
// =============================
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const textToCopy = document.getElementById(targetId).innerText;

        if (!textToCopy) {
            return;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Tampilkan feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check mr-1"></i> Disalin!';
            this.classList.add('copied');

            // Tambahkan animasi untuk feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin teks: ', err);
        });
    });
});

// =============================
// MODAL FUNCTIONS
// =============================
const modal = document.getElementById('tutorialModal');
const tutorialBtn = document.getElementById('tutorialBtn');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');

function showModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

tutorialBtn.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
closeModalBtn.addEventListener('click', hideModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// =============================
// ANIMASI SAAT LOAD PAGE
// =============================
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan efek animasi untuk elemen dengan kelas slide-up
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});