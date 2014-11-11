module Techtangents.Fewtile.Struct.Pos where

newtype Pos = Pos
  { x :: Number
  , y :: Number
  }

instance posEq :: Eq Pos where
  (==) (Pos a) (Pos b) = a.x == b.x && a.y == b.y
  (/=) a b = not (a == b)
