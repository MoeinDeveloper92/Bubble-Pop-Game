In this project I will make use of RequestAnimationFrame in order to perform repetetive action to push bublees float up
in the game class all the logic and functions will go, first we should grab it from the index.html and add all the functionality of the game.
 

Window.requestAnimationFrame() is a method tells the browser that you wish to perform an animation and request that the browser calls a sepecified function to update an animatrion right before the next repaint. this method takes a callback as an argument to be invoked before the repaint.
Note=> your callback routine must itself call requestanimationframe() again if you want to animate another frame at the next repaint.
You should call this method whenevr you are ready to update ypur animation on screen. This will request that your animation function be called before the browser performs the next repaing. Then number of callbacks is usually 60 tumes per second, but will generally match the dispaly refresh rate in most web briser.

As for the Game, we have some objects which we should pop them, as for game's rule we should not move over the red skull.
