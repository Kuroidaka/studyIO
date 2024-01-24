
import { motion } from "framer-motion";
import styled from "styled-components";

const EmptyBox = () => {
    return ( 
        <motion.div 
            className='start-screen'
            initial={{ opacity: 0, fontSize: '12', x: 100 }}
            animate={{ opacity: 1, fontSize: '30', x: 0 }}
            transition={{ duration: 1 }}>
            <Text>What can I help you?</Text>
        </motion.div>
     );
}
 
export default EmptyBox;

const Text = styled.p`
    color: #fff;
    font-weight: bold;
`