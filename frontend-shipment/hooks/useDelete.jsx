import Swal from "sweetalert2";

export const useDelete = () => {
  const deleteDetail = async (url) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (!result.isConfirmed) {
        return;
      }
      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const resp = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      Swal.close();

      if (resp.ok) {
        // call the function to remove the detail from the frontend
        // onSuccess?.(id);

        Swal.fire({
          title: "Deleted!",
          text: data.message || "Deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        return true;
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Failed to delete",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting detail:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };
  return { deleteDetail };
};
