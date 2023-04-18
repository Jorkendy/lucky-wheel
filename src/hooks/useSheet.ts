import { useCallback, useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import Swal from "sweetalert2";
const useSheet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(import.meta.env.VITE_CONNECTION_URL);
      if (response.status === HttpStatusCode.Ok) {
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  const updateSheet: any = useCallback(async (id: string) => {
    const index = data.findIndex((_item: { id: string }) => _item.id === id);
    const item: any = data.find((_item: { id: string }) => _item.id === id);
    if (index === -1 || !item) {
      return;
    }
    const response = await axios.patch(
      `${import.meta.env.VITE_CONNECTION_URL}/${index}`,
      { in_stock: item.in_stock - 1, left: item.left + 1 }
    );
    if (response.status !== HttpStatusCode.Ok) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cập nhật sheet thất bại, vui lòng kiểm tra lại!",
      });
    }
  }, [data]);

  return { data, updateSheet };
};

export default useSheet;
