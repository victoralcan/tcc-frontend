import React, { useRef, useState } from 'react';
import { Button } from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';

const EditImage = (props) => {
  const [rotacao, setRotacao] = useState(0);
  const [scaleEdit, setScaleEdit] = useState(1);
  const editor = useRef(null);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleSalvarEdit = (e) => {
    e.preventDefault();
    const canvasScaled = editor.current.getImageScaledToCanvas().toDataURL();
    const file = dataURLtoFile(canvasScaled, props.fileEdit.name);
    props.updateImage(file);
    handleCancelarEdit(e);
  };

  const handleCancelarEdit = (e) => {
    e.preventDefault();
    props.setHideEdit(true);
    setScaleEdit(1);
    setRotacao(0);
  };

  const handleRotacionar = (e) => {
    e.preventDefault();
    let rotac = rotacao + 90;
    setRotacao(rotac);
  };

  const handleScale = (e) => {
    e.preventDefault();
    setScaleEdit(parseFloat(e.target.value));
  };

  return (
    <div
      style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <AvatarEditor
        ref={editor}
        image={props.fileEdit}
        width={250}
        height={250}
        border={30}
        rotate={rotacao}
        scale={scaleEdit}
      />
      <section className="mt-3">
        <span>Zoom</span>
        <input
          name="scale"
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={scaleEdit}
          onChange={handleScale}
        />
        <Button
          className="mr-2 ml-5 waves-effect waves-light"
          onClick={handleRotacionar}
        >
          Rotacionar
        </Button>
      </section>
      <section className="mt-3">
        <Button
          color="primary"
          className="mr-2 waves-effect waves-light"
          onClick={handleSalvarEdit}
        >
          Salvar
        </Button>
        <Button
          className="mr-2 waves-effect waves-light"
          onClick={handleCancelarEdit}
        >
          Cancelar
        </Button>
      </section>
    </div>
  );
};
export default EditImage;
