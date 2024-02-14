import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const showAlert = async (options) => {
  try {
    const result = await Swal.fire(options);
    return result;
  } catch (error) {
    throw error;
  }
};
