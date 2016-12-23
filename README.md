# lumihoop-client
Socket server &amp; interface for the Lumihoop project

<a href="https://vimeo.com/196621657">![](https://res.cloudinary.com/thibault-maekelbergh/image/upload/v1482491969/Lumihoop/Screenshot_2016-12-23_12.19.02.png)</a>

## Brief
> As final assignment in your last programming course, you will make an installation for kids, to be used in the youth film festival's medialab.
You'll work in groups of two. Use at least one of the technologies we treated troughout the course (openframeworks, arduino, makeymakey, kinect, leap, …).

## Concept
[@kevinmeyvaert](https://github.com/kevinmeyvaert) and I teamed up to create an interactive basketball-like installation that could be used in any space as long as you had the hardware at hand.
You can view the project teaser on Vimeo: https://vimeo.com/196621657

### Hardware & software used
* iPad Mini
* HTML5 application (Canvas)
* Node server ([hapi](https://github.com/hapijs/hapi), [socket.io](https://github.com/socketio/socket.io))

This application needs to be used in conjuction with the [lumihoop-app](https://github.com/thibmaek/lumihoop-app).

Adding this to the homescreen we could disguise it as a 'native application' and max out our playground to draw on. Drawing is done by pinching to make a circle. Once released it emits a package with the x, y and scale to the socket server, which the other application listened to.

> Special thanks to [@wouterverweirder](https://github.com/wouterverweirder) for helping us out and [@devinehowest](https://github.com/devinehowest) for the fun project opportunity!
