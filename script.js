<script>
        document.addEventListener('DOMContentLoaded', function() {
            // Obtener todos los elementos ramo
            const ramos = document.querySelectorAll('.ramo');
            const totalRamos = ramos.length;
            const progresoLleno = document.getElementById('progreso-lleno');
            const porcentajeElement = document.getElementById('porcentaje');
            
            // Contador de ramos aprobados
            let aprobados = 0;
            
            // Función para actualizar el progreso
            function actualizarProgreso() {
                const porcentaje = Math.round((aprobados / totalRamos) * 100);
                progresoLleno.style.width = porcentaje + '%';
                porcentajeElement.textContent = porcentaje + '% completado';
            }
            
            // Función para desbloquear ramos
            function desbloquearRamos(ramoId) {
                ramos.forEach(ramo => {
                    const requisitos = ramo.getAttribute('data-requisitos');
                    if (requisitos && requisitos.includes(ramoId)) {
                        ramo.classList.remove('bloqueado');
                    }
                });
            }
            
            // Función para manejar el clic en un ramo
            function manejarClicRamo(event) {
                const ramo = event.currentTarget;
                
                // Si el ramo está bloqueado, no hacer nada
                if (ramo.classList.contains('bloqueado')) return;
                
                // Si ya está aprobado, no hacer nada
                if (ramo.classList.contains('aprobado')) return;
                
                // Marcar como aprobado
                ramo.classList.add('aprobado');
                aprobados++;
                actualizarProgreso();
                
                // Obtener los ramos que este abre
                const abre = ramo.getAttribute('data-abre');
                if (abre) {
                    const ramosQueAbre = abre.split(',');
                    ramosQueAbre.forEach(id => {
                        desbloquearRamos(id);
                    });
                }
            }
            
            // Asignar evento clic a todos los ramos no bloqueados
            ramos.forEach(ramo => {
                if (!ramo.classList.contains('bloqueado')) {
                    ramo.addEventListener('click', manejarClicRamo);
                }
            });
            
            // Botón para aprobar todo
            document.getElementById('aprobarTodo').addEventListener('click', function() {
                ramos.forEach(ramo => {
                    ramo.classList.remove('bloqueado');
                    ramo.classList.add('aprobado');
                });
                aprobados = totalRamos;
                actualizarProgreso();
            });
            
            // Botón para reiniciar
            document.getElementById('reiniciar').addEventListener('click', function() {
                ramos.forEach(ramo => {
                    ramo.classList.remove('aprobado');
                    
                    // Solo los del primer semestre sin requisitos deben estar desbloqueados
                    const semestre = ramo.closest('.semestre');
                    const anio = semestre ? semestre.closest('.anio') : null;
                    const tituloAnio = anio ? anio.querySelector('.titulo-anio') : null;
                    
                    if (tituloAnio && tituloAnio.textContent.includes('Primer Año') && 
                        semestre.querySelector('.titulo-semestre').textContent.includes('I Semestre')) {
                        ramo.classList.remove('bloqueado');
                    } else {
                        ramo.classList.add('bloqueado');
                    }
                });
                
                aprobados = 0;
                actualizarProgreso();
                
                // Reasignar eventos a los ramos desbloqueados
                ramos.forEach(ramo => {
                    ramo.removeEventListener('click', manejarClicRamo);
                    if (!ramo.classList.contains('bloqueado')) {
                        ramo.addEventListener('click', manejarClicRamo);
                    }
                });
            });
            
            // Inicializar progreso
            actualizarProgreso();
        });
    </script>
