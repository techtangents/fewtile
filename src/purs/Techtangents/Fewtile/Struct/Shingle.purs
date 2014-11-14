module Techtangents.Fewtile.Struct.Shingle where

import Data.Maybe
import qualified Techtangents.Fewtile.Struct.Style as Style
import qualified Techtangents.Fewtile.Struct.Pos as Pos
import qualified Techtangents.Fewtile.Struct.Size as Size
import qualified Techtangents.Fewtile.Struct.Rect as Rect
import qualified Techtangents.Fewtile.Struct.Tile as Tile

newtype Shingle = Shingle
  { style  :: Style.Style
  , link   :: Maybe String
  , text   :: String
  , pos    :: Pos.Pos
  , size   :: Size.Size
  }

instance shingleEq :: Eq Shingle where
  (==) (Shingle a) (Shingle b) =
    a.style == b.style &&
    a.link  == b.link  &&
    a.text  == b.text  &&
    a.pos   == b.pos   &&
    a.size  == b.size
  (/=) a b = not (a == b)

shingle style link text pos size =
  Shingle
    { style: style
    , link: link
    , text: text
    , pos: pos
    , size: size
    }

shingle' :: Tile.Tile -> Rect.Rect -> Shingle
shingle' (Tile.Tile t) r =
  shingle t.style t.link t.text (Rect.origin r) (Rect.size r)
