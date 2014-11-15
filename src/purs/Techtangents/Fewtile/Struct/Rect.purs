module Techtangents.Fewtile.Struct.Rect where

import Math (round)

import qualified Techtangents.Fewtile.Struct.Pos as Pos
import qualified Techtangents.Fewtile.Struct.Size as Size

newtype Rect = Rect
  { x :: Number
  , y :: Number
  , width :: Number
  , height :: Number
  }

instance rectEq :: Eq Rect where
  (==) (Rect a) (Rect b) =
    a.x == b.x &&
    a.y == b.y &&
    a.width == b.width &&
    a.height == b.height
  (/=) a b = not (a == b)

rect :: Number -> Number -> Number -> Number -> Rect
rect x y w h = Rect {x: x, y: y, width: w, height: h}

rect' :: Pos.Pos -> Size.Size -> Rect
rect' (Pos.Pos p) (Size.Size s) =
  rect p.x p.y s.width s.height

origin :: Rect -> Pos.Pos
origin (Rect r) =
  Pos.Pos {x: r.x, y: r.y}

size :: Rect -> Size.Size
size (Rect r) =
  Size.Size {width: r.width, height: r.height}

top    (Rect r) = r.y
bottom (Rect r) = r.y + r.height
left   (Rect r) = r.x
right  (Rect r) = r.x + r.width

quantize :: Rect -> Rect
quantize (Rect r) =
  let left   = round r.x
      right  = round (r.x + r.width)
      top    = round r.y
      bottom = round (r.y + r.height)
      width  = right - left
      height = bottom - top
  in  rect left top width height
