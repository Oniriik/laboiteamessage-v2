import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

export const processImg = async (user: string): Promise<Buffer> => {
  const fontPath = path.join(process.cwd(), 'assets/fonts/playfair.ttf');
  registerFont(fontPath, { family: 'playfair' });

  const imagePath = path.join(process.cwd(), 'assets/images/letter.png');
  const img = await loadImage(imagePath);
  const W = 2000;
  const size = user.length <= 12 ? 200 : Math.max(200 - 3 * (user.length - 12), 10);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, img.width, img.height);

  ctx.font = `${size}px playfair`;
  const textWidth = ctx.measureText(user).width;

  ctx.fillStyle = 'rgba(120,45,45,1)';
  ctx.fillText(user, (W - textWidth) / 2, 900);
  return canvas.toBuffer('image/png');
};
