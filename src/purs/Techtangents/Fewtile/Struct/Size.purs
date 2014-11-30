module Techtangents.Fewtile.Struct.Size where

newtype Size = Size
  { width  :: Number
  , height :: Number
  }

size :: Number -> Number -> Size
size w h =
  Size { width: w, height: h }

instance sizeEq :: Eq Size where
  (==) (Size a) (Size b) = a.width == b.width && a.height == b.height
  (/=) a b = not $ a == b

instance sizeCompare :: Ord Size where
  compare a b = compare (area a) (area b)

area :: Size -> Number
area (Size s) =
  s.width * s.height

bimap :: (Number -> Number) -> Size -> Size
bimap f (Size s) =
  Size { width: f s.width
       , height: f s.height
       }

divide :: Size -> Size -> Size
divide (Size num) (Size dom) =
  Size { width : num.width  / dom.width
       , height: num.height / dom.height
       }

scale :: Number -> Size -> Size
scale f =
  bimap $ (*) f
