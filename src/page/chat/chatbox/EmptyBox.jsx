
import { motion } from "framer-motion";

const EmptyBox = () => {
    return ( 
        <motion.div 
            className='start-screen'
            initial={{ opacity: 0, fontSize: '12', x: 100 }}
            animate={{ opacity: 1, fontSize: '30', x: 0 }}
            transition={{ duration: 1 }}>
            <p>What can I help you?</p>
        </motion.div>
     );
}
 
export default EmptyBox;