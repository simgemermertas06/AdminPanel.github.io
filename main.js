document.addEventListener("DOMContentLoaded", function () {

    //========================= * DARK MODE * ======================================

    const darkModeSwitch = document.querySelector('.dark-mode');
    const body = document.body;

    // Sayfa yüklendiğinde dark modun durumunu kontrol et
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark');
    }

    darkModeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark');
        // Dark mod durumunu sakla
        const isDarkMode = body.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    /* ===============FAREYLE ÜZERİNE GELİNEN SINIFI SEÇİLEN LİSTE ÖGESİNE EKLE=============== */

    let list = document.querySelectorAll(".navbar li"); /* list bir NodeList (düğümler listesi) olarak döner, yani bir dizi gibi davranır ama tam anlamıyla bir dizi değildir.*/
    /*
    querySelectorAll yöntemi, .navbar sınıfına sahip tüm li öğelerini seçer ve list adlı bir değişkene atar.
    */

    function activeLink() { /* activeLink adında bir fonksiyon tanımlanır. Bu fonksiyon, bir li öğesi üzerine gelindiğinde çağrılacaktır. */
        list.forEach((item) => { /* list içindeki her li öğesi (item olarak adlandırılır) üzerinde döngü yapılır. */
            item.classList.remove('hovered'); /* Her li öğesinden seçildi sınıfı kaldırılır. Bu, aktif sınıfın önce kaldırılmasını sağlar, böylece sadece bir öğede aktif sınıf bulunur. */
        });
        this.classList.add("hovered"); /* this, fareyle üzerine gelinen li öğesini belirtir. Bu öğeye seçildi sınıfı eklenir, böylece görsel olarak farklılaşır. */
    }

    list.forEach((item) => item.addEventListener("", activeLink));
    /* list içindeki her li öğesine mouseover (fareyle üzerine gelme) olayı eklenir. */
    /* Bu şekilde, her li öğesi üzerine gelindiğinde activeLink fonksiyonu çağrılacaktır. */

    /* Tıklama olayını ekler. */
    list.forEach((item) => {
        item.addEventListener("click", activeLink);
    });

    //===================SAYFA AKTİFKEN NAVBAR'DAKİ "a" LİNKİ=========================

    const currentPath = window.location.pathname.split("/").pop(); // Sadece dosya adını alır
        const menuItems = document.querySelectorAll('.navbar li a');
    
        menuItems.forEach((menuItem) => {
            const linkPath = menuItem.getAttribute('href');
            
            // Eğer linkPath sadece sayfa adı içeriyorsa
            if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
                menuItem.classList.add('active');
            } else {
                menuItem.classList.remove('active');
            }
        });
    
    /* ===================TOOGLE BUTON İLE NAVBAR AÇMA=================== */

    let toogle = document.querySelector(".toogle");
    let navbar = document.querySelector(".navbar");
    let main = document.querySelector(".main");

    toogle.onclick = function () {
        navbar.classList.toggle("active");
        main.classList.toggle("active");
    };

    /* ===========Aşağı kaydırılmada üstteki topbar'ın rengi değişsin============== */

    /*
    window.addEventListener('scroll', function() {
       var header = document.querySelector('.topbar');
       if (window.scrollY > 50) { // Kaydırma mesafesi, bu örnekte 50 piksel olarak ayarlandı
           header.classList.add('scrolled');
       } else {
           header.classList.remove('scrolled');
       }
    });
    */


    //============================NAVBAR İÇİNDEKİ sub-menu' YÜ AÇMA=======================================

    // Sub menü butonlarına tıklama olayını yönet
    document.querySelectorAll('.sub-btn').forEach(btn => {
        btn.addEventListener('click', function (event) {
            // Diğer sub-menüleri kapat
            closeAllSubMenusExcept(this);

            const subMenu = this.querySelector('.sub-menu');
            const subItems = subMenu.querySelectorAll('.sub-item');
            const subMenuHeight = subItems.length * subItems[0].offsetHeight;

            // CSS değişkenini ayarla
            document.documentElement.style.setProperty('--sub-menu-height', `${subMenuHeight}px`);

            // Sub menüyü aç/kapa
            subMenu.classList.toggle('show');

            // Sub menüye tıklanan öğeye open class ekle/kaldır
            if (subMenu.classList.contains('show')) {
                this.classList.add('open');
            } else {
                this.classList.remove('open');
            }

            // Event bubbling'i durdurmak için
            event.stopPropagation();
        });
    });

    // Sub-menu içindeki item'lere tıklama olayını yönet
    document.querySelectorAll('.sub-menu .sub-item').forEach(item => {
        item.addEventListener('click', function (event) {
            // Diğer sub-item'ların aktif sınıfını kaldır
            this.parentNode.querySelectorAll('.sub-item').forEach(i => i.classList.remove('active'));

            // Tıklanan sub-item'a aktif sınıfını ekle
            this.classList.add('active');

            // Tıklanan item nedeniyle sub-menu'nün kapanmasını engelle
            event.stopPropagation();
        });
    });

    // Sayfanın herhangi bir yerine tıklanırsa sub menüleri kapat
    document.addEventListener('click', function (event) {
        closeAllSubMenusExcept();
    });

    // Belirtilen öğe dışındaki tüm sub menüleri kapat
    function closeAllSubMenusExcept(current = null) {
        document.querySelectorAll('.sub-btn').forEach(btn => {
            if (btn !== current) {
                const subMenu = btn.querySelector('.sub-menu');
                subMenu.classList.remove('show');
                btn.classList.remove('open');
            }
        });
    }


    /* =========================TABLOLARIN İSTENİLEN SATIR SAYISINI EKRANDA GÖSTERME(İstenilen tablo sayısı kadar)============================ */

    const maxRows = 6; // Görünür satır sayısı

    // Tablo ID'lerini ve satırları yönet
    const tableIDs = ["#table1", "#table2"];

    tableIDs.forEach(tableID => { /*  Her döngü adımında, tableID değişkeni geçerli tablo ID'sini temsil eder. */
        const rows = document.querySelectorAll(`${tableID} tr`);
        /* document.querySelectorAll metodu, geçerli tableID'ye sahip tablodaki tüm 
        tr (satır) elemanlarını seçer ve rows değişkenine atar.  */
        for (let i = maxRows; i < rows.length; i++) {
            rows[i].classList.add('hidden');
        }
        /*
        Bu döngü, maxRows değerinden başlayarak tüm satırları tarar. 
        maxRows'dan fazla olan her satırın classList'ine 'hidden' sınıfını ekler.
        */
    });

    /* ========================PAGİNATİON BUTONARI İLE SAYFA DEĞİŞTİRME(#table1 için)=================================== */

    function setupPagination(tableID, paginationContainerID, maxVisibleRows) {
        const rows = document.querySelectorAll(`${tableID} tbody tr`);
        const totalRows = rows.length;
        let currentPage = 1;
        const pageCount = Math.ceil(totalRows / maxVisibleRows);

        function displayRows(page) {
            const startIndex = (page - 1) * maxVisibleRows;
            const endIndex = startIndex + maxVisibleRows;

            rows.forEach((row, index) => {
                if (index >= startIndex && index < endIndex) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });

            // Tüm sayfa numarası butonlarından `active` sınıfını kaldır
            document.querySelectorAll(`${paginationContainerID} ul.page li`).forEach((li) => {
                li.classList.remove('active');
            });

            // İlgili sayfa numarası butonuna `active` sınıfını ekle
            document.querySelector(`${paginationContainerID} ul.page li:nth-child(${page + 1})`).classList.add('active');
        }

        // İlk sayfayı göster
        displayRows(currentPage);

        // Pagination butonlarını yönetme
        document.querySelectorAll(`${paginationContainerID} ul.page li a`).forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                if (button.textContent === 'Önceki') {
                    if (currentPage > 1) {
                        currentPage--;
                    }
                } else if (button.textContent === 'Sonraki') {
                    if (currentPage < pageCount) {
                        currentPage++;
                    }
                } else {
                    currentPage = parseInt(button.textContent);
                }

                displayRows(currentPage);
            });
        });
    }

    // İlk tablo için sayfalama kurulumunu yap
    setupPagination("#table1", "#pagination1", 6);

    // İkinci tablo için sayfalama kurulumunu yap
    setupPagination("#table2", "#pagination2", 6);


    //============================SEARCH BUTONU İLE FİLTRELEME======================================

    document.getElementById('searchInput').addEventListener('input', function () {
        var input = this.value.toLowerCase();
        var table = document.getElementById('table2');
        var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            var found = false;

            for (var j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().indexOf(input) > -1) {
                    found = true;
                    break;
                }
            }

            rows[i].style.display = found ? '' : 'none';
        }
    });



    //===========================(CARİ EKLEME)=====================================

    // Modal ve butonları seçin
    var myModal = document.getElementById('myModal');
    var addSuccessModal = document.getElementById('addSuccessModal');
    var openModalBtn = document.getElementById('addNew');
    var closeBtn = document.getElementsByClassName('close')[0];
    var saveButton = document.getElementById('saveButton');

    // Modalı açma işlevi
    openModalBtn.onclick = function () {
        myModal.style.display = 'block';
        // Geçişin başlaması için küçük bir gecikme
        setTimeout(function () {
            myModal.classList.add('show');
        }, 10);
    }

    // Modalı kapama işlevi
    closeBtn.onclick = function () {
        myModal.classList.remove('show');
        // Geçiş tamamlandıktan sonra modalı gizle
        setTimeout(function () {
            myModal.style.display = 'none';
        }, 300); // Geçiş süresiyle eşleşir
    }

    // Modal dışında tıklayarak kapama işlevi
    window.onclick = function (event) {
        if (event.target === myModal) {
            myModal.classList.remove('show');
            setTimeout(function () {
                myModal.style.display = 'none';
            }, 300); // Geçiş süresiyle eşleşir
        }
    }

    // Kaydet butonuna tıklama işlevi
    saveButton.onclick = function (event) {
        event.preventDefault(); // Formun sayfayı yenilemesini engelle
        myModal.classList.remove('show');
        // Modalı kapat
        setTimeout(function () {
            myModal.style.display = 'none';
            // Başarı modalını aç
            addSuccessModal.style.display = 'block';
            setTimeout(function () {
                addSuccessModal.classList.add('show');
            }, 10);
            // Başarı modalını 3 saniye sonra kapat
            setTimeout(function () {
                addSuccessModal.classList.remove('show');
                setTimeout(function () {
                    addSuccessModal.style.display = 'none';
                }, 300); // Geçiş süresiyle eşleşir
            }, 3000); // 3 saniye
        }, 300); // Geçiş süresiyle eşleşir
    }


    //=============================CARİ SİLME============================================

    // Silme modalı ve butonlar
    const deleteModal = document.getElementById("deleteModal");
    const deleteButtons = document.querySelectorAll(".delete");
    const deleteClose = document.getElementById("deleteClose");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");

    // Silme başarılı modal'ı ve kapatma butonu
    const successModal = document.getElementById("successModal");
    const successClose = document.getElementById("successClose");

    // Silme butonlarına tıklandığında silme modal'ını aç
    deleteButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            deleteModal.style.display = "block";
        });
    });

    // Silme modal'ını kapatma butonuna tıklandığında modal'ı kapat
    deleteClose.onclick = function () {
        deleteModal.style.display = "none";
    }

    // Modal dışında bir yere tıklanınca modal'ı kapat
    window.onclick = function (event) {
        if (event.target == deleteModal) {
            deleteModal.style.display = "none";
        }
    }

    // İptal butonuna tıklandığında modal'ı kapat
    document.getElementById('cancelDelete').onclick = function () {
        deleteModal.style.display = "none";
    }

    // Silme onayı butonuna tıklandığında silme modal'ını kapat ve silme başarılı modal'ını aç
    confirmDeleteBtn.onclick = function () {
        deleteModal.style.display = "none";
        showDeleteSuccessModal(); // Silme başarılı modal'ını aç ve otomatik kapat
    }

    // Silme başarılı modal'ını aç ve otomatik kapat
    function showDeleteSuccessModal() {
        successModal.style.display = "block"; // Modal'ı göster

        // Belirli bir süre sonra modal'ı kapat
        setTimeout(function () {
            successModal.style.display = "none";
        }, 3000); // 3000 milisaniye = 3 saniye
    }


    //========================CARİ GÜNCELLEME===================================

    // Güncelleme modalı ve butonlar
    const updateModal = document.getElementById("updateModal");
    const updateButtons = document.querySelectorAll(".update");
    const updateClose = document.getElementById("updateClose");
    const updateForm = document.getElementById("updateForm");
    const updateField = document.getElementById("updateField");

    // Güncelleme başarılı modal'ı ve kapatma butonu
    const upsuccessModal = document.getElementById("UpsuccessModal");
    const upsuccessClose = document.getElementById("upsuccessClose");

    // Güncelleme butonlarına tıklandığında güncelleme modal'ını aç
    updateButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const currentValue = this.dataset.value;
            const currentName = this.dataset.name;
            const currentResponsible = this.dataset.responsible;
            const currentProfilePic = this.dataset.profilePic;

            // Güncelleme modal form fields'ını doldur
            document.getElementById("updateName").value = currentName;
            document.getElementById("updateResponsible").value = currentResponsible;
            if (currentProfilePic) {
                document.getElementById("currentProfilePic").src = currentProfilePic;
            } else {
                console.log("currentProfilePic is undefined");
            }

            updateModal.style.display = "block";
            updateModal.classList.add("show");
        });
    });

    // Güncelleme modal'ını kapatma butonuna tıklandığında modal'ı kapat
    updateClose.onclick = function () {
        updateModal.style.display = "none";
        updateModal.classList.remove("show");
    }

    // Modal dışında bir yere tıklanınca modal'ı kapat
    window.onclick = function (event) {
        if (event.target == updateModal) {
            updateModal.style.display = "none";
            updateModal.classList.remove("show");
        }
    }

    // Güncelleme formu gönderildiğinde
    updateForm.onsubmit = function (event) {
        event.preventDefault();
        updateModal.style.display = "none"; // Güncelleme modal'ını kapat
        updateModal.classList.remove("show");
        showUpdateSuccessModal(); // Güncelleme başarılı modal'ını aç ve otomatik kapat
    }

    // Güncelleme başarılı modal'ını aç ve otomatik kapat
    function showUpdateSuccessModal() {
        upsuccessModal.style.display = "block";
        upsuccessModal.classList.add("show");

        // Belirli bir süre sonra modal'ı kapat
        setTimeout(function () {
            upsuccessModal.style.display = "none";
            upsuccessModal.classList.remove("show");
        }, 3000); // 3000 milisaniye = 3 saniye
    }

    //=========================================================

});

/* ========================PROFİL BUTONU ile dropdown açma================== */

let userMenu = document.getElementById("userMenu");

function toogleMenu() {
    userMenu.classList.toggle("openMenu");
}


//==========================TÜMÜNÜ GÖR BUTONUNU ÇALIŞTIRMA================================

document.addEventListener('DOMContentLoaded', function () {
    const maxVisibleRows = 6; // Görünür satır sayısı
    const tableID = "#table1"; // Tablo ID'si
    const rows = document.querySelectorAll(`${tableID} tbody tr`);
    const totalRows = rows.length;
    let currentPage = 1;
    let isShowingAll = false;
    const pageCount = Math.ceil(totalRows / maxVisibleRows);

    function displayRows(page) {
        const startIndex = (page - 1) * maxVisibleRows;
        const endIndex = startIndex + maxVisibleRows;

        rows.forEach((row, index) => {
            if (isShowingAll || (index >= startIndex && index < endIndex)) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        });

        // Sayfa numarası butonlarını güncelle
        document.querySelectorAll('.pagination ul.page li').forEach((li) => {
            li.classList.remove('active');
        });

        const activeButton = document.querySelector(`.pagination ul.page li:nth-child(${page + 1})`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Pagination butonlarını kontrol et
        document.querySelector('#prevPage').style.display = (page > 1 && !isShowingAll) ? 'inline' : 'none';
        document.querySelector('#nextPage').style.display = (page < pageCount && !isShowingAll) ? 'inline' : 'none';
    }

    function showAll() {
        isShowingAll = true;
        displayRows(1);
        document.querySelector('.pagination').style.display = 'none'; // Pagination'ı gizle
    }

    // "Tümünü Gör" butonuna tıklama olayını yönetme
    document.getElementById('showAll').addEventListener('click', function (e) {
        e.preventDefault();
        showAll();
    });

    // Pagination butonlarını yönetme
    document.getElementById('prevPage').addEventListener('click', function (e) {
        e.preventDefault();
        if (!isShowingAll && currentPage > 1) {
            currentPage--;
            displayRows(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function (e) {
        e.preventDefault();
        if (!isShowingAll && currentPage < pageCount) {
            currentPage++;
            displayRows(currentPage);
        }
    });

    document.querySelectorAll('.pagination ul.page li a').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (isShowingAll) return; // "Tümünü Gör" modunda pagination butonları çalışmamalı

            if (button.textContent === 'Önceki') {
                if (currentPage > 1) {
                    currentPage--;
                }
            } else if (button.textContent === 'Sonraki') {
                if (currentPage < pageCount) {
                    currentPage++;
                }
            } else {
                currentPage = parseInt(button.textContent);
            }

            displayRows(currentPage);
        });
    });

    // İlk sayfayı göster
    displayRows(currentPage);
});

//======================ŞİFREYİ GÖSTER-GÖSTERME========================

function togglePassword() {
    const passwordField = document.getElementById('p_password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

//========================KULLANICI BİLDİRİMİ==============================

function showNotificationDot() {
    const userElement = document.querySelector('.user');
    if (userElement) {
        userElement.classList.add('show-notification');
    } else {
        console.error('Element with class "user" not found');
    }
}

function hideNotificationDot() {
    const userElement = document.querySelector('.user');
    if (userElement) {
        userElement.classList.remove('show-notification');
    } else {
        console.error('Element with class "user" not found');
    }
}

function toggleMenu() {
    // Menü açma/kapama işlemlerini buraya ekleyebilirsiniz
}

// Sayfa yüklendiğinde örnek olarak bildirim noktası göster
document.addEventListener('DOMContentLoaded', function () {
    showNotificationDot(); // Noktayı göster
});

//================MESAJ SİLME KUTUSU============================

// Modal öğelerini seçme
const deleteModal = document.getElementById("deleteModal");
const successModal = document.getElementById("successModal");
const deleteButtons = document.querySelectorAll(".delete");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const closeBtn = document.getElementById("deleteClose");

let currentItem = null; // Şu anda silinecek öğe

// Tüm silme butonları için olay dinleyici ekle
deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
        event.preventDefault(); // Varsayılan link davranışını engelle
        currentItem = this; // Tıklanan butonun referansını sakla
        deleteModal.style.display = "block";
    });
});

// Onayla butonuna tıklanınca silme işlemini gerçekleştir ve başarılı modalını göster
confirmDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none"; // Onay modalını kapat

    // currentItem burada silme işlemini temsil eder, burada gerçek silme işlemi yapılabilir
    // Örneğin, currentItem.parentElement.parentElement.remove(); gibi bir işlem yapılabilir

    successModal.style.display = "block"; // Başarı modalını aç

    // 3 saniye sonra başarı modalını kapat
    setTimeout(function () {
        successModal.style.display = "none";
    }, 3000);
});

// İptal butonuna tıklanınca silme onayı modalını kapat
cancelDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
});

// Kapatma butonuna tıklanınca silme onayı modalını kapat
closeBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
});

// Modal dışına tıklanırsa modali kapat
window.addEventListener("click", function (event) {
    if (event.target === deleteModal) {
        deleteModal.style.display = "none";
    }
});



