import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    requester: { // El usuario que envía la solicitud de amistad
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: { // El usuario que recibe la solicitud de amistad
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: { // El estado de la solicitud de amistad
        type: String,
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending'
    }
}, {
    timestamps: true
});

friendshipSchema.index({ requester: 1, recipient: 1 }, { unique: true }); //esto hace que no se puedan enviar múltiples solicitudes de amistad entre los mismos usuarios

const Friendship = mongoose.model('Friendship', friendshipSchema);

export default Friendship;
