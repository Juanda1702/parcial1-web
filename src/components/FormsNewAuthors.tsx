import { useState } from "react";

type Autor = {
  birthDate: string;
  description: string;
  image: string;
};

function FormsNewAuthors() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleSubmit = () => {
    if (!birthDate || !description || image) {
      alert("No se rellenaron todos los datos");
      return;
    }

    const datos = {};
  };

  return (
    <form action="" className="">
      <input type="text" placeholder="hola" name="birthDate" />
      <input type="text" placeholder="hola" name="description" />
      <input type="text" placeholder="hola" name="image" />
      <button>Registrar</button>
    </form>
  );
}

export default FormsNewAuthors;
