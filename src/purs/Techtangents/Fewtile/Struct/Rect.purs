module Techtangents.Fewtile.Struct.Rect where

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
