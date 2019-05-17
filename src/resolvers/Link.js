function postedBy(root, args, context, info) {
  return context.prisma.link({ id: root.id }).postedBy();
}

module.exports = {
  postedBy,
}
