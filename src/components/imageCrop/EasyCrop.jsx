import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  styled,
} from '@mui/material';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import CustomTypo from '../common/CustomTypo';
import getCroppedImg from './Crop';

import RestartAltIcon from '@mui/icons-material/RestartAlt';

const EasyCrop = ({ image, passCroppedImg, open, closeDialog }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setZoom(1);
    setCroppedImage(null);
  }, []);

  const closeDialogPre = () => {
    setZoom(1);
    setCroppedImage(null);
    closeDialog();
  };

  return (
    <DialogExt open={open} fullWidth={true} maxWidth='sm'>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          style={{
            display: image === null || croppedImage !== null ? 'none' : 'block',
          }}
        >
          <Box
            sx={{
              height: '400px',
              width: '300px',
            }}
          >
            <Cropper
              image={image}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              zoomSpeed={4}
              maxZoom={4}
              zoomWithScroll={true}
              showGrid={true}
              aspect={6 / 8}
              cropShape='rect'
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              objectFit='contain'
            />
          </Box>
        </Box>
        <Box
          mt={2}
          sx={{
            display: image === null || croppedImage !== null ? 'none' : 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '300px',
            marginInline: 'auto',
            alignItems: 'center',
          }}
        >
          <CustomTypo fontFamily='KoHo'>Zoom</CustomTypo>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='zoom'
            onChange={(e, zoom) => setZoom(zoom)}
            className='range'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& img': {
              height: '100%',
              width: 'auto',
              maxHeight: '400px',
              objectFit: 'contain',
            },
          }}
        >
          {croppedImage && <img src={croppedImage.url} alt='cropped' />}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        {croppedImage ? (
          <Button
            variant='outlined'
            onClick={onClose}
            color='error'
            sx={{
              mt: 1,
            }}
            disableRipple
            startIcon={<RestartAltIcon />}
          >
            Reset Image
          </Button>
        ) : (
          <Button
            variant='outlined'
            onClick={showCroppedImage}
            color='warning'
            sx={{
              mt: 1,
            }}
            disableRipple
          >
            Crop Image
          </Button>
        )}
        <Box>
          <Button variant='contained' onClick={closeDialogPre} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='info'
            onClick={() => {
              passCroppedImg(croppedImage);
              setCroppedImage(null);
            }}
            disabled={croppedImage === null}
          >
            Apply
          </Button>
        </Box>
      </DialogActions>
    </DialogExt>
  );
};

const DialogExt = styled(Dialog)(() => ({
  '& .MuiDialogActions-root': {
    paddingInline: '24px',
  },
}));

export default EasyCrop;
