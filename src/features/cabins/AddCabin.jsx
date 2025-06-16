
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";
import Modal from "../../ui/Modal";
export default function AddCabin() {

    return <div><Modal>
        <Modal.Open opens="cabin-form">
            <Button variation="primary" size="medium">Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinForm />
        </Modal.Window>



    </Modal>
    </div>
}


// export default function AddCabin() {
//     const [isOpenModal, setisOpenModal] = useState(false);

//     return (
//         <>
//             <Button variation="primary" size="medium" onClick={() => setisOpenModal((show) => !show)}>Add new Cabin</Button>
//             {isOpenModal && <Modal onClose={() => setisOpenModal(false)}><CreateCabinForm onClose={() => setisOpenModal(false)} /></Modal>}

//         </ >
//     );
// }