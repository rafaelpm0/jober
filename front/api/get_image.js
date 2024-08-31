/**
 * Fetches image data for a specific job and updates the image state.
 * 
 * @param {Function} setImage - The function used to set the image state.
 * @param {number} id - The ID of the job for which to fetch the image.
 * 
 * @example
 * // Example usage
 * const [image, setImage] = useState([]);
 * const jobId = 123;
 * 
 * // Fetch image data for job with ID 123
 * await Image({ setImage, id: jobId });
 */

export default async function getImage(setImage, id) {
    try {
      
      const response = await fetch(`http://127.0.0.1:8000/api/img/?job_id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setImage(data);
      // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
