// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Mevcut liste öğelerine "kapat" butonu ve olay dinleyicileri ekle
    setupExistingListItems();

    // "Ekle" butonuna tıklama olayı ekle
    document.querySelector('.button').addEventListener('click', newElement);

    // Input alanında 'Enter' tuşuna basıldığında yeni öğe ekle
    document.getElementById('task').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            newElement();
        }
    });
});

// Mevcut liste öğelerini ayarlayan fonksiyon
function setupExistingListItems() {
    let myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        addCloseButtonAndListeners(myNodelist[i]);
    }
}

// Yeni liste öğesi oluşturan fonksiyon
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("task").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        showToast('error'); // Boş giriş hatası
    } else {
        document.getElementById("list").appendChild(li);
        showToast('success'); // Başarılı ekleme
    }
    document.getElementById("task").value = ""; // Inputu temizle

    // Yeni eklenen öğeye kapat butonu ve olay dinleyicileri ekle
    addCloseButtonAndListeners(li);
}

// Liste öğesine kapat butonu ve tıklama/silme olay dinleyicileri ekleyen yardımcı fonksiyon
function addCloseButtonAndListeners(liElement) {
    // Kapat butonu oluştur
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7"); // "x" işareti
    span.className = "close";
    span.appendChild(txt);
    liElement.appendChild(span);

    // Kapat butonuna tıklama olayı (silme)
    span.onclick = function() {
        let div = this.parentElement;
        div.style.display = "none"; // Öğeyi gizle
    };

    // Liste öğesine tıklama olayı (tamamlandı olarak işaretleme)
    liElement.onclick = function(event) {
        // Sadece liste öğesine tıklandığında (kapat butonuna değil)
        if (event.target === liElement || event.target.nodeName === 'LI') {
            liElement.classList.toggle('checked');
        }
    };
}

// Toast mesajlarını gösteren fonksiyon
function showToast(type) {
    let toastElement;
    if (type === 'success') {
        toastElement = document.querySelector('.toast.success');
    } else if (type === 'error') {
        toastElement = document.querySelector('.toast.error');
    }

    if (toastElement) {
        // Bootstrap 4 toast'ı göstermek için jQuery kullanılır
        // HTML'de aynı ID'ye sahip iki toast olduğu için düzeltildi
        // Her toast'a benzersiz ID verilmeli veya sınıf ile seçilmeli.
        // Ben burada sınıflara göre seçiyorum.
        $(toastElement).toast('show');
    }
}