module Techtangents.Fewtile.Struct.Style where

type Color = String

newtype Style = Style
  { fg :: Color
  , bg :: Color
  }

instance styleEq :: Eq Style where
  (==) (Style a) (Style b) = a.fg == b.fg && a.bg == b.bg
  (/=) a b = not (a == b)


defaultFg :: Color
defaultFg = "#ffffff"

disabled     = Style {bg: "#999999", fg: "#eeeeee"}
dead         = Style {bg: "#000000", fg: defaultFg}
loading      = Style {bg: "#0000ff", fg: defaultFg}
fail         = Style {bg: "#BD3333", fg: defaultFg}
pass         = Style {bg: "#308A48", fg: defaultFg}
failBuilding = Style {bg: "#9C6425", fg: defaultFg}
passBuilding = Style {bg: "#99D638", fg: defaultFg}

