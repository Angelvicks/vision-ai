# import the cv2 library
import cv2

import pytesseract
from PIL import Image
pytesseract.pytesseract.tesseract_cmd ='C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
img = cv2.imread('toi.jpg',cv2.COLOR_BGR2GRAY)
print(pytesseract.image_to_string(img))
cv2.imshow('Result',img)
cv2.waitKey(0)

# The function cv2.imread() is used to read an image.
img_grayscale = cv2.imread('test.jpg',0)

# The function cv2.imshow() is used to display an image in a window.
cv2.imshow('graycsale image',img_grayscale)

# waitKey() waits for a key press to close the window and 0 specifies indefinite loop
cv2.waitKey(0)

# cv2.destroyAllWindows() simply destroys all the windows we created.
cv2.destroyAllWindows()

# The function cv2.imwrite() is used to write an image.
cv2.imwrite('grayscale.jpg',img_grayscale)

# path 
#path = r'C:\Users\Rajnish\Desktop\geeksforgeeks.png'

# Reading an image in default mode
image = cv2.imread(path)

# Window name in which image is displayed
window_name = 'image'

# Using cv2.imshow() method 
# Displaying the image 
cv2.imshow(window_name, image)

#waits for user to press any key 
#(this is necessary to avoid Python kernel form crashing)
cv2.waitKey(0) 

#closing all open windows 
cv2.destroyAllWindows() 