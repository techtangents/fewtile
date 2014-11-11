module Techtangents.Fewtile.Struct.Tile where

import qualified Techtangents.Fewtile.Struct.Style as Style
import Data.Maybe

newtype Tile = Tile
  { passing  :: Boolean
  , building :: Boolean
  , weight   :: Number
  , style    :: Style.Style
  , link     :: Maybe String
  , text     :: String
  }

instance tileEq :: Eq Tile where
  (==) (Tile a) (Tile b) =
    a.passing  == b.passing  &&
    a.building == b.building &&
    a.weight   == b.weight   &&
    a.style    == b.style    &&
    a.link     == b.link     &&
    a.text     == b.text
  (/=) a b = not (a == b)


individual :: Boolean -> Boolean -> Number -> Style.Style -> String -> String -> Tile
individual p b w s l t =
  Tile {passing: p, building: b, weight:w, style:s, link:(Just l), text:t}

pass             = individual true  false 10 Style.pass
passBuilding     = individual true  true  10 Style.passBuilding
fail             = individual false false 50 Style.fail
failBuilding     = individual false true  50 Style.failBuilding
disabled         = individual false false  5 Style.disabled
disabledBuilding = individual false true   5 Style.disabled

overarching :: Style.Style -> String -> Tile
overarching s t =
  Tile {passing: false, building: false, weight:100, style:s, link:Nothing, text:t}

loading          =  overarching Style.loading  "Loading..."
dead             =  overarching Style.dead     "☠"
allPassing       =  overarching Style.pass     "All jobs passing"
noJobs           =  overarching Style.fail     "No jobs"
noneBuilding     =  overarching Style.disabled "No jobs building"

