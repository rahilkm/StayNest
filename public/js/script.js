(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

const taxSwitch = document.getElementById("flexSwitchCheckDefault");

if (taxSwitch) {

    taxSwitch.addEventListener("change", () => {

        const prices = document.querySelectorAll(".listing-price");

        prices.forEach((priceTag) => {

            const originalPrice = Number(priceTag.dataset.price);

            if (taxSwitch.checked) {

                const totalPrice = Math.round(originalPrice * 1.18);

                priceTag.innerHTML =
                    `&#8377; ${totalPrice.toLocaleString("en-IN")} / night`;

            } else {

                priceTag.innerHTML =
                    `&#8377; ${originalPrice.toLocaleString("en-IN")} / night`;

            }

        });

    });

}