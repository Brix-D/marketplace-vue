const modalOverlayColorMixin = {
    props: {
        overlayOpacity: {
            type: [String, Number],
            default: '1',
        },
        overlayColor: {
            type: String,
            default: 'rgba(103, 118, 140, 0.5)',
        },
    },
};

export { modalOverlayColorMixin };
export default modalOverlayColorMixin;
