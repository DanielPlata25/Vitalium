       
       
       const btnAgregar  = document.getElementById('btnAgregar');
        const btnCancelar = document.getElementById('btnCancelar');
        document.getElementById('btnCancelar').style.display = 'none'; 
             document.getElementById('panelAgregar').style.display = 'none';


       const categorias = document.querySelectorAll(".categoria-item");
       const categoriasTabla = document.querySelectorAll(".categoria-item2");

categoriasTabla.forEach(item => {
  item.addEventListener("click", () => {
    categoriasTabla.forEach(i => i.classList.remove("active"));
    item.classList.add("active");


 

});
  });

      
    

categorias.forEach(item => {
  item.addEventListener("click", () => {
    categorias.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
 const icono = item.querySelector(".cat-icon").textContent;
      const nombre = item.querySelector(".cat-nombre").textContent;
       const cantidad = item.querySelector(".cat-badge").textContent;

 
  document.getElementById("tituloCategoria").textContent = nombre;
  document.getElementById("productosAsignados").textContent = `Productos asignados a "${nombre}"`;
  document.getElementById("subtituloCategoria").textContent = `${cantidad} productos asignados`;
  document.getElementById("imagenChiquita").textContent = icono;
});
  });



        btnAgregar.addEventListener('click', function () {
            console.log(1);
           
            btnCancelar.classList.add('visible');
            btnAgregar.style.display = 'none';
               document.getElementById('btnCancelar').style.display = 'flex';
               document.getElementById('panelAgregar').style.display = 'flex';
        });

        btnCancelar.addEventListener('click', function () {
            btnCancelar.classList.remove('visible');
            btnAgregar.style.display = '';
                    document.getElementById('btnCancelar').style.display = 'none'; 
                     document.getElementById('panelAgregar').style.display = 'none';

             });