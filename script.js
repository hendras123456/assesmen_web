$(document).ready(function() {
    // Menangani klik pada elemen dengan kelas .isi
    $('.isi').on('click', function() {
        var $item = $(this);
        var itemName = $item.find('p').text();
        var itemPriceText = $item.find('h1').text();
        var itemPrice = parseFloat(itemPriceText.replace('Rp. ', '').replace('.', '').replace(',', '.'));

        if (!isNaN(itemPrice)) {
            var formattedItemName = itemName.replace(/\s+/g, '_').toLowerCase();

            // Mengecek apakah item sudah ada di dalam keranjang
            var $existingItem = $('.belanja').find(`#${formattedItemName}`);
            if ($existingItem.length) {
                var $quantitySpan = $existingItem.find('.stock');
                var currentQuantity = parseInt($quantitySpan.text()) + 1;
                $quantitySpan.text(currentQuantity);
            } else {
                // Menambahkan elemen ke keranjang dengan informasi item yang diklik
                $('.belanja').append(`
                    <div class="barang" id="${formattedItemName}">
                        <div class="detail-kiri">
                            <p>${itemName}</p>
                            <p class="normal">Unit Price: Rp. ${itemPrice.toLocaleString('id-ID')}</p>
                        </div>
                        <div class="detail-kanan">
                            <p class="normal" style="display: flex; justify-content: space-between; gap: 4em;">Quantity : <span class="stock">1</span></p>
                            <button class="remove">
                                <span class="material-symbols-outlined" id="hapus">delete</span>
                            </button>
                        </div>
                    </div>
                `);
            }
            calculateTotal(); // Panggil fungsi untuk menghitung total setelah menambah item
        } else {
            console.error('Harga item tidak valid saat menambahkan item ke keranjang');
        }
    });

    // Menangani klik pada tombol delete di dalam keranjang belanja
    $('.belanja').on('click', '.remove', function() {
        var $item = $(this).closest('.barang');
        var $quantitySpan = $item.find('.stock');
        var currentQuantity = parseInt($quantitySpan.text());

        if (currentQuantity > 1) {
            currentQuantity--;
            $quantitySpan.text(currentQuantity);
        } else {
            $item.remove();
        }
        calculateTotal(); // Memanggil fungsi untuk menghitung ulang total setelah item dihapus
    });
});