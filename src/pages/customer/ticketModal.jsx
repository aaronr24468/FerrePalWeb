import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from 'dayjs';

export const TicketModal = ({ credit }) => {
    const componentRef = useRef(null)

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Recivo',
        pageStyle: `
        @page { 
            size: 80mm auto; 
            margin: 0mm ; 
        }
        @media print {
            body { 
            margin: 0 ; 
            padding: 0 ;
            width: 80mm ;
            }
            /* Elimina encabezados/pies de página nativos que meten espacio extra */
        html {
            margin: 0 ; 
        } 
        .ticket_Container{
            width: 80mm;
            padding: 4mm;
            box-sizing: border-box;
            font-family: monospace;
            font-size: 12px;
            line-height: 1.4;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
      }
        `
    })

    return (
        <>
            <dialog id="ticket_credit" open={false}>
                <div className="container_Ticket">
                    <section className="ticket_Container" ref={componentRef}>
                        <p>FerrePal</p>
                        <p>---------------------------------------------</p>
                        <p>Fecha del credito: {dayjs(credit.updated_at, 'YYYY/MM/DD').format('DD [de] MMMM [de] YYYY')}</p>
                        <p>---------------------------------------------</p>
                        <p>Total a pagar: ${credit.amount}</p>
                        <p>Total Abonado: ${credit.Installment}</p>
                        <p>---------------------------------------------</p>
                        <p>---------------Descripcion---------------</p>
                        <p>---------------------------------------------</p>
                        <p>{credit.description}</p>
                        <p>---------------------------------------------</p>
                        
                    </section>
                    <button className="btn_ticket" onClick={handlePrint}>Imprimir</button>
                </div>
            </dialog>
            
        </>

    )
}