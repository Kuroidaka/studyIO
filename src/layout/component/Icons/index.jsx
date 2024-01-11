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
const Delete2 = () => {
    return <TiDelete size={16} />;
};
const Image2 = () => {
    return <FaImage size={16} />;
};
const File2_2 = () => {
    return <FaFile size={16} />;
};
export {
    Upload,
    Send,
    File1,
    File2,
    File2_2,
    Image,
    Image2,
    Delete,
    Delete2,
    AttachFile,
};