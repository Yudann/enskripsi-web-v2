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
        // EVENT LISTENER TOMBOL ENKRIPSI
        // =============================
        document.getElementById("btnEnkripsi").addEventListener("click", () => {
            const input = document.getElementById("inputText").value.trim();

            if (!input) {
                alert("Teks tidak boleh kosong!");
                return;
            }

            const hasil = encryptPipeline(input);

            document.getElementById("outputSubstitusi").innerText = hasil.step1;
            document.getElementById("outputPermutasi").innerText = hasil.step2;

            // Kosongkan output dekripsi
            document.getElementById("outputReversePermutasi").innerText = "";
            document.getElementById("outputReverseSubstitusi").innerText = "";
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

            document.getElementById("outputReversePermutasi").innerText = hasil.step1;
            document.getElementById("outputReverseSubstitusi").innerText = hasil.step2;

            // Kosongkan output enkripsi
            document.getElementById("outputSubstitusi").innerText = "";
            document.getElementById("outputPermutasi").innerText = "";
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

                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Gagal menyalin teks: ', err);
                });
            });
        });