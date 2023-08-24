import { NewsModel } from "mongodb/schema";
import { INews } from "@definitions";

class NewsService {
  public async saveNews({ news }: { news: Partial<INews> }) {
    try {
      console.log(news.title);
      const newsModel = new NewsModel(news);
      const { _id } = await newsModel.save();

      return { id: _id };
    } catch (error) {
      console.log(error);
      return true;
    }
  }

  public async getNews() {
    try {
      return await NewsModel.find();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async getFilterAndSearchNews({
    filter,
    query,
  }: {
    filter: string;
    query: string;
  }) {
    try {
      return await NewsModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { tags: { $in: filter } }, // Filter by tags
        ],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public updateNews({ _id, news }: { _id: string; news: INews }) {
    try {
      const updateUser = NewsModel.findByIdAndUpdate(
        _id,
        { $set: news },
        { new: true }
      );

      return updateUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async deleteNews({ id }: { id: string }) {
    try {
      const { _id: deletedUser } = await NewsModel.findByIdAndRemove(id);

      return { deletedUser };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default NewsService;
