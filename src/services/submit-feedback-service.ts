import { MailAdapter } from '../repositories/adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) { }

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feeback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '<div>',
      ].join('\n'),
    });
  }
}
