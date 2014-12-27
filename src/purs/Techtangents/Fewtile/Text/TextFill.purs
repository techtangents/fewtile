module Techtangents.Fewtile.Text.TextFill where

import Control.Bind
import Control.Monad.Eff
import DOM
import qualified Control.Monad.JQuery as JQ

import Techtangents.Fewtile.Struct.Size


{-
thespyder & techtangents' über text filling algorithm

Scales the font-size of an element so that it roughly fills its parent.

Scales in two phases:

1. Gross scale
- Find the percentage width and height of the element, relative to its parent's rendered width and height.
- For the greater of these two percentages, if it's within a threshold then scale the font size (in pixels)
  by that percentage, applying a minor tweak.

2. Fine tune
- If necessary, apply minor adjustments up or down, measuring as we go, until the element roughly fills the
  parent.
- The text doesn't precisely fill the element - a range of acceptible sizes is in place, to avoid minor
  change in text size when the visual effect good enough.

This technique performs well by minimizing the number of times:
- the text is resized in the DOM
- the element is measured

Measurements occur on an 'off-screen' div - actually in the DOM, but large negative x,y.
The end result is just a font size.


Visually, it works roughly like this:
size------------->
|{==>  <==}        [            ]   |            {==>
  gross             acceptible     element      gross
  scale             range          bounds         scale
  range                                           range


Known issues:
- Make sure the direct parent is fixed size.

-}

type JQuery = JQ.JQuery

-- TODO: submit to purescript-jquery
foreign import getInnerWidth
  """
  function getInnerWidth(ob) {
    return function () {
      return ob.innerWidth();
    };
  }
  """ :: forall eff. JQuery -> Eff (dom :: DOM | eff) Number

-- TODO: submit to purescript-jquery
foreign import getInnerHeight
  """
  function innerHeight(ob) {
    return function () {
      return ob.innerHeight();
    };
  }
  """ :: forall eff. JQuery -> Eff (dom :: DOM | eff) Number


-- TODO: submit to purescript-jquery
foreign import getOuterWidth
  """
  function getOuterWidth(ob) {
    return function () {
      return ob.outerWidth();
    };
  }
  """ :: forall eff. JQuery -> Eff (dom :: DOM | eff) Number

-- TODO: submit to purescript-jquery
foreign import getOuterHeight
  """
  function getOuterHeight(ob) {
    return function () {
      return ob.outerHeight();
    };
  }
  """ :: forall eff. JQuery -> Eff (dom :: DOM | eff) Number


-- TODO: submit to purescript-jquery
foreign import getWidth
  """
  function getWidth(ob) {
    return function () {
      return ob.width();
    };
  }
  """ :: forall eff. JQuery -> Eff (dom :: DOM | eff) Number

-- TODO: submit to purescript-jquery
foreign import getHeight
  """
  function getHeight(ob) {
    return function () {
      return ob.height();
    };
  }
  """ :: forall eff. JQuery -> Eff (dom :: DOM | eff) Number

type Jeff a = forall eff. JQuery -> Eff (dom :: DOM | eff) a

sizer :: forall a b. (Apply a) => (b -> a Number) -> (b -> a Number) -> b -> a Size
sizer = \w h jq -> size <$> w jq <*> h jq

getInnerSize :: Jeff Size
getInnerSize =
  sizer getInnerWidth getInnerHeight

getOuterSize :: Jeff Size
getOuterSize =
  sizer getOuterWidth getOuterHeight

getSize :: Jeff Size
getSize =
  sizer getOuterWidth getOuterHeight


minFontSize = 2
maxFontSize = 2000

minScale = 0.85
maxScale = 0.90
grossDelta = 0.2

grossTweak = 0.95
fontDelta = 1

textFill :: forall eff. Number -> Number -> String -> Eff (dom :: DOM | eff) Number
textFill width height text =
  let
    element :: forall eff. Eff (dom :: DOM | eff) JQuery
    element =
      JQ.select("<span />")
      >>= JQ.setText text

    div :: forall eff. Eff (dom :: DOM | eff) JQuery
    div =
      JQ.select "<div />"
      >>= JQ.addClass "tile"
      >>= JQ.css
        { position: "absolute"
        , left: -10000
        , top: -10000
        , width: (show width) ++ "px"
        , height: (show height) ++ "px"
        }

    div' :: forall eff. Eff (dom :: DOM | eff) JQuery
    div' =
      join $ JQ.append <$> element <*> div

  in
    return 0

{-

    $(document.body).append(div);

    var chfont = function(fs) {
      element.css('font-size', fs);
    };

    var parentSize = measureInner(div);
    var min = size.scale(parentSize, minScale);
    var max = size.scale(parentSize, maxScale);

    var grossBig = size.scale(parentSize, 1 + grossDelta);
    var grossSmall = size.scale(parentSize, 1 - grossDelta);

    element.css({border: 0, margin: 0, padding:0});
    var ourSize = measureOuter(element);

    var fontSize = parseInt(element.css("fontSize"), 10);
    fontSize = isNaN(fontSize) || typeof fontSize !== "number" ? 10 : fontSize;

    if (ourSize.width > 0 && ourSize.height > 0) {
      element.css('font-size', fontSize);

      var percentage = size.divide(ourSize, parentSize);
      var side = percentage.width >= percentage.height ? "width" : "height";

      if (ourSize[side] >= grossBig[side] || ourSize[side] <= grossSmall[side]) {
        fontSize = Math.round(fontSize / percentage[side] * grossTweak);
        chfont(fontSize);
      }

      while (
           element.outerHeight(true) < min.height
        && element.outerWidth(true) < min.width
        && fontSize <= maxFontSize
      ) {
        fontSize += fontDelta;
        chfont(fontSize);
      }

      while (
           (element.outerHeight(true) > max.height || element.outerWidth(true) > max.width)
        && fontSize >= minFontSize
      ) {
        fontSize -= fontDelta;
        chfont(fontSize);
      }
    }

    div.remove();

    return fontSize;
  };
});
-}