import { FiUpload } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { PiFilesFill } from "react-icons/pi";
import { FaImage, FaFile } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { MdAttachFile } from "react-icons/md";
const Upload = () => {
    return <FiUpload size={22} />;
};
const Send = () => {
    return <IoSend size={22} />;
};
const File1 = () => {
    return <PiFilesFill size={22} />;
};
const File2 = () => {
    return <FaFile size={22} />;
};
const Image = () => {
    return <FaImage size={22} />;
};
const Delete = () => {
    return <TiDelete size={22} />;
};
const AttachFile = () => {
    return <MdAttachFile size={22} />;
};

export {
    Upload,
    Send,
    File1,
    File2,
    Image,
    Delete,
    AttachFile,
};