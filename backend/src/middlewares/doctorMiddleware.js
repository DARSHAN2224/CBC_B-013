export const onlySellerAccess = asyncHandler(async (req, res, next) => {

    if (req.user.role != 1) {
        throw new ApiError("Unauthorized request for seller", 400, "you have not permission to access this route!");
    }

    return next();
})